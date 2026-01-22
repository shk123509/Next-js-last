import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
    },

    subject: {
      type: String,
      default: "General Inquiry",
    },

    message: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 2000,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    source: {
      type: String, // e.g. "landing-page", "contact-page"
      default: "website",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
