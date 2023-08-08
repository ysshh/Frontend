import React, { useState } from 'react';
import { Button, Container, Typography, ListItem, ListItemButton, ListItemText , List } from '@mui/material';

function Square({ value, onSquareClick }) {
  const squareStyle = {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px', // Adjust the width
    height: '100px', // Adjust the height
    fontSize: '24px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  };

  return (
    <Button variant="outlined" style={squareStyle} onClick={onSquareClick}>
      {value}
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const rows = [];
  for (let row = 0; row < 3; row++) {
    const cols = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      cols.push(
        <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
      );
    }
    rows.push(<div key={row} className="board-row">{cols}</div>);
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {status}
      </Typography>
      <div>{rows}</div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <ListItem key={move}>
        <ListItemButton onClick={() => jumpTo(move)}>
          <ListItemText primary={description} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Tic Tac Toe
      </Typography>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <List>{moves}</List>
    </Container>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
