interface ButtonProps {
  children: string;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <div>
      <div className="alert alert-warning alert-dismissible fade hide" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>  
      <button type="button" className="btn btn-primary"
        onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
