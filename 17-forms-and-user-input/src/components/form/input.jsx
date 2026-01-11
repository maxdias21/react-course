export default function Input({label, id, error, ...props}) {
  return (
    
      <div className="control no-margin">
          {/* Ao invés de for tem que ser htmlFor, pois como é um arquivo js, for o comando de repetição */}
          <label htmlFor={id}>{label}</label>
          <input 
          {...props}
          id={id} 
          />
        <div className="control-error">{error}</div>
      </div>
  )
}