import { useState } from "react";
import { Button } from "@mui/material";
import styles from "./index.module.scss";
import classnames from 'classnames'

// Constant for calculator buttons
const nums = [['C', 'CE', '*', '/'], [7, 8, 9, '-'], [4, 5, 6, '+'], [1, 2, 3, '='], [0, '.']];
const Calculator = () => {
    // Handling the calculator screen
    const [acc, setAcc] = useState('')
    // Handling the Result
    const [result, setResult] = useState('')
    // Clearing the calculator display
    const clearDisplay = () => {
        setResult('')
        setAcc('')
    }
    // if user clicks on a number
    const handleNumber = (num: number) => {
        if (result.length <= 8) {
            setResult(result + num)
        }
    }
    //if user clicks on an operation
    const handleOperation = (sinal: string) => {
        if (result == '') {
            return
        }
        else if (result.split('')[result.length - 1] == '.') {
            setAcc(acc + result + '0' + ` ${sinal} `)
            setResult('')
        }
        else {
            setAcc(acc + result + ` ${sinal} `)
            setResult('')
        }
    }
    // if user clicks on the decimal
    const handleDecimal = () => {
        if (result.length == 0) {
            setResult('0.')
        }
        else if (result.split('')[result.length - 1] == '.') {
            return
        }
        else {
            setResult(result + '.')
        }
    }
    // Calculating the Result.
    const getResult = () => {
        var calculatedResult = String(acc + result).replace('÷', '/').replace('x', '*')
        calculatedResult = String(eval(calculatedResult)).substring(0, 9)
        setResult(calculatedResult)
        setAcc('')
    }
    // This function is called whenever user clicks on any button on calculator.
    const calculatorButtonClick = (button: string | number) => {
        if (typeof button == 'number') {
            handleNumber(button)
        } else {
            switch (button) {
                case 'C':
                    setResult('')
                    break;
                case 'CE':
                    clearDisplay()
                    break;
                case '.':
                    handleDecimal()
                    break;
                case '=':
                    getResult()
                    break;
                default:
                    handleOperation(button)
                    break;
            }
        }
    }
    // Managing different styles for buttons.
    const getButtonSpecificCSS = (button: string | number) => {
        if (button == '=') {
            return 'equal'
        }
        return `${button}`
    }
    return (
        <div className={styles.calculatorContainer}>
            <div className={styles.calculatorContent}>
                <div className={styles.calculatorDisplay}>
                    <div className={styles.acc}>{acc}</div>
                    <div className={styles.total}>{result}</div>
                </div>
                <div className={styles.calculatorButtonsContainer} >
                    {nums.map((row, index) => (
                        <div key={`row-${index}`} className={styles.dFlex}>
                            {row.map((column, cIndex) => (
                                <Button
                                    variant="contained"
                                    className={classnames(styles.caclulatorButton, styles[`calculatorButton${getButtonSpecificCSS(column)}`])}
                                    key={column}
                                    onClick={() => calculatorButtonClick(column)}>
                                    {column}
                                </Button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Calculator