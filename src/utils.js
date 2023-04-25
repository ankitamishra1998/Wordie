export function randomWalkAlgorithm() {
    const grid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 0));
    // Set the start and end cells
    const start = [4, 4];   // top-left corner
    const end = [0, 0];     // bottom-right corner

    // Mark the start cell as part of the path
    grid[start[0]][start[1]] = 1;

    // Random walk algorithm
    let current = start;
    const path = [current];
    while (!arraysEqual(current, end)) {
        // Get a list of neighboring cells that are not yet part of the path
        const neighbors = [];
        if (current[0] > 0 && grid[current[0]-1][current[1]] === 0) {
            neighbors.push([current[0]-1, current[1]]);
        }
        if (current[1] > 0 && grid[current[0]][current[1]-1] === 0) {
            neighbors.push([current[0], current[1]-1]);
        }

        // If there are no neighboring cells, backtrack to the previous cell
        if (neighbors.length === 0) {
            current = path.pop();
        } else {
            // Randomly choose a neighboring cell and move to it
            const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
            grid[nextCell[0]][nextCell[1]] = 1;
            path.push(nextCell);
            current = nextCell;
        }
    }

    return path;
}

// Helper function to compare two arrays
export function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}
