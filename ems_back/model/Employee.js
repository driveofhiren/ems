import mongoose from "mongoose";

const uri =
  "mongodb+srv://nerih:nerih@cluster0.ubxrdbv.mongodb.net/?authMechanism=DEFAULT&tls=true";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoose");
  })
  .catch((err) => {
    console.log("Not connected:", err);
  });

const EmployeeSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Age: { type: Number, required: true },
  DateOfJoining: { type: String, required: true },
  Title : { type: String, required: true },
  Department: { type: String, required: true },
  EmployeeType: { type: String, required: true },
  CurrentStatus: { type: Boolean, required: true },
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
export default EmployeeModel;
