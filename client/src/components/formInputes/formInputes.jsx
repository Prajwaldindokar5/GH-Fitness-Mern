const FormInput = ({ label, ...otherFields }) => {
  return (
    <>
      <label>{label}</label>
      <input {...otherFields} />
    </>
  );
};

export default FormInput;
