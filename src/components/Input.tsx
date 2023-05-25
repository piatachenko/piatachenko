interface InputProps {
  placeholder?: string;
  customClass?: string;
}

export default function Input({ placeholder, customClass }: InputProps) {
  return (
    <>
      <div>
        <input
          type={"text"}
          placeholder={placeholder}
          className={`w-full bg-transparent outline-none ${customClass}`}
        />
      </div>
    </>
  );
}
