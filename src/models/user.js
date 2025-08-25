import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, maxlength: 50, trim: true},
    lastName: {type: String, required: true, maxlength: 50, trim: true},
    cpf: {type: String, required: true, unique: true, minlength: 11, maxlength: 11, match: /^\d{11}$/},
    birthDate: {type: Date, required: true},
    email: {type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"]},
    phone: {type: String, required: true, minlength: 11, maxlength: 15, trim: true},
    address: {
        street: {type: String, maxlength: 100, required: true},
        city: {type: String, maxlength: 50, required: true},
        state: {type: String, 
            enum: ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
                "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC",
                "SP","SE","TO"], 
            minlength: 2, maxlength: 2, uppercase: true, required: true},
        zipCode: {type: String, minlength: 8, maxlength: 8, match: /^\d{8}$/, required: true},
    },
    password: {type: String, required: true, minlength: 8, maxlength: 128, select: false},
    createdAt: {type: Date, default: Date.now},
});

userSchema.pre("save", function(next) {
  const capitalizeName = (name) => {
    if (!name) {
        return name
    };
    return name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
  if (this.isModified('firstName') && this.firstName) {
    this.firstName = capitalizeName(this.firstName);
  };
  if (this.isModified('lastName') && this.lastName) {
    this.lastName = capitalizeName(this.lastName);
  };
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
