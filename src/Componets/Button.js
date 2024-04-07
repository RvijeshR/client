
const Button = ({ buttonText, isLoading = false, disabled = false, onClick, className}) => {
  return (
    <button
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`min-w-[150px] h-10 md:h-12 bg-orange-400 px-2 md:px-4 hover:bg-orange-500 text-sm font-medium md:text-base py-2 md:py-3 text-white rounded-md whitespace-nowrap ${(isLoading || disabled) ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {isLoading ? "Loading... ": buttonText}
    </button>
  );
};

export default Button;