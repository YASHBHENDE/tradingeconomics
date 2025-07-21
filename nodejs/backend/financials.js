import te from "tradingeconomics"
import { apiKey } from "./config.js";

export async function GetFinancial(stockName){
    await te.login(apiKey);

    const Financial_data = te.getFinancialsData(symbol = stockName).then(function(data){
        return (data)     
    });

    return Financial_data


}
