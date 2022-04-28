import React, { useState } from "react";

function InputForm({ onSubmmitHandler }) {
    const [stockName, setStockName] = useState("");

    return (
        <div className="container m-1">
            <form onSubmit={(e) => {
                e.preventDefault();
                setStockName('');
                onSubmmitHandler(stockName);
            }}>
                <label>Enter stock name:
                    <input
                        type="text"
                        value={stockName}
                        onChange={(e) => setStockName(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
        </div>
    );
}

export default InputForm;