import './TextInput.css';

export default function TextInput({ placeholder, value, handleChange }) {
  return (
    <label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </label>
  );
}