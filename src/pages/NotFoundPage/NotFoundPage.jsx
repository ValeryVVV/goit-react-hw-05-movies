import React from "react"
import { useNavigate } from "react-router-dom";
import style from './NotFound.module.css';

export default function NotFound() {

    const navigate = useNavigate();

    const handleSubmit = async values => {
          navigate("/", { replace: false });
    }
    return (
        <div className={style.wrap}>
            <h2>404 Not Found </h2>
            <button className={style.btn} type="button" onClick={handleSubmit}>
                Go home
            </button>
        </div>
    )
}