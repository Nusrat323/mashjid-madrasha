
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaInbox,
} from "react-icons/fa";

import Modal from "../Modal.jsx";
import Loader from "../Loader.jsx";
import EmptyState from "../EmptyState.jsx";
import { Field, inputClass } from "../Field.jsx";
import useFetch from "../../hooks/useFetch.js";
import { api } from "../../lib/api.js";

export default function CrudManager({
  title,
  subtitle,
  endpoint,
  fields,
  emptyForm,
  renderItem,
}) {
  const { data, loading, reload } =
    useFetch(endpoint);

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const set = (name, value) =>
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

  const save = async (event) => {
    event.preventDefault();

    const payload = Object.fromEntries(
      fields.map((field) => [
        field.name,
        form[field.name],
      ])
    );

    setSaving(true);

    try {
      if (form._id) {
        await api.put(
          `${endpoint}/${form._id}`,
          payload,
          true
        );
      } else {
        await api.post(
          endpoint,
          payload,
          true
        );
      }

      toast.success("সংরক্ষণ করা হয়েছে");

      setForm(null);

      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (item) => {
    setDeleteItem(item);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteItem(null);
  };

  const remove = async () => {
    if (!deleteItem) return;

    setDeleting(true);

    try {
      await api.remove(
        `${endpoint}/${deleteItem._id}`,
        true
      );

      toast.success("মুছে ফেলা হয়েছে");

      setDeleteItem(null);

      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const renderInput = (field) => {
    const value =
      form[field.name] ?? "";

    if (field.type === "textarea") {
      return (
        <textarea
          required={field.required}
          rows={4}
          value={value}
          onChange={(e) =>
            set(
              field.name,
              e.target.value
            )
          }
          className={inputClass}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          value={value}
          onChange={(e) =>
            set(
              field.name,
              e.target.value
            )
          }
          className={inputClass}
        >
          {field.options.map(
            (option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )
          )}
        </select>
      );
    }

    return (
      <input
        type={field.type || "text"}
        required={field.required}
        value={
          field.type === "date"
            ? String(value).slice(
                0,
                10
              )
            : value
        }
        onChange={(e) =>
          set(
            field.name,
            e.target.value
          )
        }
        className={inputClass}
      />
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-indigo-950">
            {title}
          </h1>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <button
          onClick={() =>
            setForm(emptyForm)
          }
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-800"
        >
          <FaPlus />
          নতুন যোগ করুন
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : !data ||
        data.length === 0 ? (
        <EmptyState
          icon={FaInbox}
          title="কিছু যোগ করা হয়নি"
          text="উপরের বাটন থেকে নতুন তথ্য যোগ করুন।"
        />
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item._id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="min-w-0 flex-1">
                {renderItem(item)}
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() =>
                    setForm(item)
                  }
                  aria-label="সম্পাদনা"
                  className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-700 transition hover:bg-indigo-100"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() =>
                    openDeleteModal(item)
                  }
                  aria-label="মুছুন"
                  className="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-600 transition hover:bg-rose-100"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      <Modal
        open={form !== null}
        title={
          form?._id
            ? "সম্পাদনা করুন"
            : "নতুন যোগ করুন"
        }
        onClose={() =>
          setForm(null)
        }
      >
        {form && (
          <form
            onSubmit={save}
            className="space-y-4"
          >
            {fields.map((field) => (
              <Field
                key={field.name}
                label={field.label}
              >
                {renderInput(field)}
              </Field>
            ))}

            <button
              disabled={saving}
              className="w-full rounded-xl bg-indigo-900 py-3 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-60"
            >
              {saving
                ? "সংরক্ষণ হচ্ছে..."
                : "সংরক্ষণ করুন"}
            </button>
          </form>
        )}
      </Modal>

     
      <Modal
        open={deleteItem !== null}
        title="মুছে ফেলবেন?"
        onClose={closeDeleteModal}
      >
        {deleteItem && (
          <div>
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
              <div className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600">
                  <FaTrash />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    আপনি কি নিশ্চিত?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    এই তথ্যটি মুছে দিলে
                    এটি আর ফিরিয়ে আনা
                    যাবে না।
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={remove}
                disabled={deleting}
                className="flex-1 rounded-xl bg-rose-600 px-4 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting
                  ? "মুছে যাচ্ছে..."
                  : "মুছে ফেলুন"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

