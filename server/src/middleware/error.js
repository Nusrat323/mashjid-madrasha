export const notFound = (req, res) => {
  res.status(404).json({ message: "অনুরোধকৃত পাতা পাওয়া যায়নি" });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ message: "তথ্য সঠিক নয়, আবার চেষ্টা করুন" });
  }

  res.status(500).json({ message: "সার্ভারে সমস্যা হয়েছে, একটু পরে আবার চেষ্টা করুন" });
};
