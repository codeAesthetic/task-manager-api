class Validator {
  static validTaskInfo(taskInfo) {
    const { title, description, completion } = taskInfo;
    return (
      title &&
      typeof title === "string" &&
      title.length > 2 &&
      description &&
      typeof description === "string" &&
      description.length > 2 &&
      typeof completion === "boolean"
    );
  }
}
module.exports = Validator;
