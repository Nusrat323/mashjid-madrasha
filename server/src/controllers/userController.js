
import User from "../models/User.js";
import admin from "../config/firebase.js";

/*
  Firebase user -> MongoDB user sync
*/
export const syncUser = async (req, res) => {
  try {
    const {
      uid,
      email,
      name,
      picture,
      email_verified: emailVerified,
    } = req.firebaseUser;

    const adminEmail =
      process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const currentEmail =
      email?.trim().toLowerCase();

    /*
      শুধুমাত্র ADMIN_EMAIL account
      এবং Firebase verified হলে admin হবে।
    */
    const isAdminEmail = Boolean(
      adminEmail &&
        emailVerified &&
        currentEmail === adminEmail
    );

    let user = await User.findOne({ uid });

    /*
      নতুন user
    */
    if (!user) {
      user = await User.create({
        uid,
        email,
        name:
          req.body.name?.trim() ||
          name ||
          email?.split("@")[0] ||
          "User",
        photo: picture || "",
        role: isAdminEmail ? "admin" : "user",
      });

      return res.json(user);
    }

    /*
      ADMIN_EMAIL account সবসময় admin থাকবে।
    */
    if (isAdminEmail && user.role !== "admin") {
      user.role = "admin";
    }

    /*
      অন্য কোনো account এখানে admin করা হবে না।
      অর্থাৎ database-এ ভুলভাবে admin হয়ে থাকলে
      ADMIN_EMAIL ছাড়া অন্য account-কে user করা হবে।
    */
    if (!isAdminEmail && user.email?.toLowerCase() !== adminEmail) {
      if (user.role !== "user") {
        user.role = "user";
      }
    }

    /*
      Google profile picture থাকলে save করো।
    */
    if (picture && !user.photo) {
      user.photo = picture;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.error("User sync error:", error);

    res.status(500).json({
      message: "ব্যবহারকারীর তথ্য sync করা যায়নি",
    });
  }
};


/*
  নিজের profile update
*/
export const updateMe = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (name !== undefined) {
      req.user.name = name;
    }

    if (phone !== undefined) {
      req.user.phone = phone;
    }

    await req.user.save();

    res.json(req.user);
  } catch (error) {
    console.error("Profile update error:", error);

    res.status(500).json({
      message: "প্রোফাইল আপডেট করা যায়নি",
    });
  }
};


/*
  সব users
*/
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      message: "ব্যবহারকারীদের তথ্য লোড করা যায়নি",
    });
  }
};


/*
  User delete

  শুধুমাত্র superAdminOnly middleware
  এই controller পর্যন্ত request পৌঁছাতে দেবে।
*/
export const deleteUser = async (req, res) => {
  try {
    /*
      নিজের account delete করা যাবে না
    */
    if (
      req.params.id ===
      req.user._id.toString()
    ) {
      return res.status(400).json({
        message:
          "নিজের অ্যাকাউন্ট মুছে ফেলা যাবে না",
      });
    }

    /*
      Target user খুঁজে বের করা
    */
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message:
          "ব্যবহারকারী পাওয়া যায়নি",
      });
    }

    /*
      ADMIN_EMAIL account delete করা যাবে না
    */
    const adminEmail =
      process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const targetEmail =
      user.email?.trim().toLowerCase();

    if (
      adminEmail &&
      targetEmail === adminEmail
    ) {
      return res.status(400).json({
        message:
          "প্রধান অ্যাডমিনের অ্যাকাউন্ট মুছে ফেলা যাবে না",
      });
    }

    /*
      MongoDB থেকে delete
    */
    await User.findByIdAndDelete(
      req.params.id
    );

    /*
      Firebase থেকেও delete
    */
    try {
      await admin.auth().deleteUser(user.uid);

      console.log(
        `Firebase user deleted: ${user.uid}`
      );
    } catch (error) {
      /*
        MongoDB delete হয়ে গেছে।
        Firebase delete fail হলেও
        request successful রাখা হচ্ছে।
      */
      console.error(
        "Firebase user delete failed:",
        error.message
      );
    }

    return res.json({
      message:
        "ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      message:
        "ব্যবহারকারী মুছে ফেলা যায়নি",
    });
  }
};

