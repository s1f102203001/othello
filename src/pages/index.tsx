import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const directions = [
    [0, 1],
    [-1, 1],
    [1, 0],
    [1, -1],
    [1, 1],
    [-1, -1],
    [-1, 0],
    [0, -1],
  ];

  const countStones = (board: number[][]) => {
    let blackCount = 0;
    let whiteCount = 0;

    for (const row of board) {
      for (const cell of row) {
        if (cell === 1) blackCount++;
        if (cell === 2) whiteCount++;
      }
    }

    return { blackCount, whiteCount };
  };

  const { blackCount, whiteCount } = countStones(board);

  const clikHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    if (newBoard[y][x] !== 0) {
      return;
    }
    let validMove = false;
    for (const dir of directions) {
      let x_a = x + dir[0];
      let y_a = y + dir[1];
      const tilesToFlip = [];
      while (
        x_a >= 0 &&
        x_a < 8 &&
        y_a >= 0 &&
        y_a < 8 &&
        newBoard[y_a][x_a] !== 0 &&
        newBoard[y_a][x_a] !== turnColor
      ) {
        if (newBoard[y_a][x_a] !== turnColor) {
          tilesToFlip.push([x_a, y_a]);
          x_a += dir[0];
          y_a += dir[1];
          if (x_a >= 0 && x_a < 8 && y_a >= 0 && y_a < 8 && newBoard[y_a][x_a] === turnColor) {
            validMove = true;
            for (const [flipX, flipY] of tilesToFlip) {
              newBoard[flipY][flipX] = turnColor;
            }
          }
        }
      }
    }
    if (validMove) {
      newBoard[y][x] = turnColor;
      setTurnColor(turnColor === 1 ? 2 : 1);
      setBoard(newBoard);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.scoreBoard}>
        <span>
          黒: {blackCount} 白: {whiteCount}
        </span>
      </div>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clikHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.cellStone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
