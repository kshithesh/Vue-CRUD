const { object } = require("webidl-conversions");

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      firstname: String,
      lastname: String,
      email: String,
      phone: String,
    },
    {
      timestamps: true,
    }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Employees = mongoose.model("employees", schema);
  return Employees;
};
