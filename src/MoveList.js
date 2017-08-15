import React from 'react'

const MoveList = (props) => {
        const { toggled, history, stepNumber, jumpTo } = props
        let moves

        if(!toggled){
            moves = history.map((step, move) => {
                const x = parseInt(history[move].location/3, 10)
                const y = parseInt(history[move].location%3, 10)
                const desc = move ? "Move #" + x+","+y : "Game start"
                if(move === stepNumber){
                    return (
                        <li key={move}>
                            <a href="#" onClick={() => jumpTo(move)}><b>{desc}</b></a>
                        </li>
                    )
                }
                else{
                    return (
                        <li key={move}>
                            <a href="#" onClick={() => jumpTo(move)}>{desc}</a>
                        </li>
                    )
                }
            })
        }
        else{
            moves = history.reverse().map((step, move) => {
                const x = parseInt(history[move].location/3, 10)
                const y = parseInt(history[move].location%3, 10)
                const keepmove = history.length-move-1
                const desc = (move !== history.length-1) ? "Move #" + x+","+y : "Game start"
                if(keepmove === stepNumber){
                    return (
                        <li key={move}>
                            <a href="#" onClick={() => jumpTo(keepmove)}><b>{desc}</b></a>
                        </li>
                    )
                }
                else{
                    return (
                        <li key={move}>
                            <a href="#" onClick={() => jumpTo(keepmove)}>{desc}</a>
                        </li>
                    )
                }
            })
        }

        return (
            <ol>
                {moves}
            </ol>
        )
    }

export default MoveList
