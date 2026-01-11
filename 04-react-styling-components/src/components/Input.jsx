export default function Input({label, invalid, ...props}) {
  let labelClasses = "block mb-2 text-xs font-bold tracking-wide uppercase "
  let inputClasss = "w-full px-3 py-2 leading-tight border rounded shadow ";

  if(invalid) {
    labelClasses += "text-red-400";
    inputClasss += "text-red-500 bg-red-100";
  } else {
    labelClasses += "text-stone-300";
    inputClasss += "text-gray-700 bg-stone-300 border-red-300";
  }

  return (
    <p>
      <label className={labelClasses}>{label}</label>
      <input className={inputClasss} {...props}/>
    </p>
  );
}

