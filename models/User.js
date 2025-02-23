import  mongoose ,{ Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      trim: true,
      lowercase: true, // Converts email to lowercase
      match: [/.+@.+\..+/, "Please enter a valid email"], // Email regex validation
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't return password by default
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip hashing if password is not modified
  }
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Handle any errors during hashing
  }
});

// Add a method to compare passwords (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Ensure email is indexed for faster lookups
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;
