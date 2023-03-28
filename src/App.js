import * as React from "react";
import { useState } from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <Button
        fontSize={50}
        fontWeight="bold"
        margin={2}
        w="100px"
        h="100px"
        variant="outline"
        borderWidth="2px"
        borderColor="black"
        className="square"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </Button>
    );
  }

  return (
    <VStack>
      <Text fontSize={40} fontWeight="bold" pt={6}>
        {status}
      </Text>
      <Flex>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Flex>
      <Flex>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Flex>
      <Flex>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Flex>
      <Button
        w="335px"
        h="50px"
        borderColor={"black"}
        borderWidth="2px"
        onClick={restart}
      >
        RESTART
      </Button>
    </VStack>
  );
}

function Game() {
  return (
    <Box fontSize={40}>
      <Box>
        <Board />
      </Box>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `WINNER : ${winner}`
    : squares.every(Boolean)
    ? `SCRATCH : Cat's game`
    : `NEXT PLAYER : ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
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

function App() {
  return (
    <ChakraProvider>
      <Game />;
    </ChakraProvider>
  );
}

export default App;
