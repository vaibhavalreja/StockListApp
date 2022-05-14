import React, { useState } from "react";

function InputForm({ onSubmmitHandler }) {
    const [stockName, setStockName] = useState("");

    return (
        <div className="container">
            <div className="row">
                <div className="col m-1 text-center">
                    <form className="center" onSubmit={(e) => {
                        e.preventDefault();
                        setStockName('');
                        onSubmmitHandler(stockName);
                    }}>
                        <label for="inputStockName">Enter stock name: </label>
                        <input
                            id="inputStockName"
                            className="form-control m-5"
                            type="text"
                            value={stockName}
                            onChange={(e) => setStockName(e.target.value)}
                        />
                        <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InputForm;