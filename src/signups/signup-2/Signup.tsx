import { ChangeEvent, FC, useEffect, useState } from "react";
import "./styles.css";
import logo from "./logo.svg";

const usernames = ["joe", "joe1", "joe2"];

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

type UsernameProps = {
  isValid: boolean;
  isLoading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Username: FC<UsernameProps> = ({ isValid, isLoading, handleChange }) => {
  return (
    <>
      <div className="username">
        <input
          onChange={handleChange}
          autoComplete="off"
          spellCheck="false"
          className="control"
          type="email"
          placeholder="Username"
        />
        <div className={`spinner ${isLoading ? "loading" : ""}`}></div>
      </div>
      <div className={`validation ${!isValid ? "invalid" : ""}`}>
        Username already taken
      </div>
    </>
  );
};

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const debouncedUsername = useDebounce(username, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setUsername(e.target.value);
  };

  useEffect(() => {
    setIsValid(!usernames.some((u) => u === debouncedUsername));
    setIsLoading(false);
  }, [debouncedUsername]);

  return (
    <div className="card">
      <img src={logo} />
      <h2>Sign Up</h2>
      <form className="form">
        <Username
          isLoading={isLoading}
          isValid={isValid}
          handleChange={handleChange}
        />
        <input
          name="password"
          spellCheck="false"
          className="control"
          placeholder="Password"
        />
        <button disabled={!isValid} className="control" type="button">
          JOIN NOW
        </button>
      </form>
    </div>
  );
};
