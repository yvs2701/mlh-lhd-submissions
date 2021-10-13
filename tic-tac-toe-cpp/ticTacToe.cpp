#include <iostream>
using namespace std;

int board[3][3] =
    {
        {0, 0, 0},
        {0, 0, 0},
        {0, 0, 0}};

char realBoard[3][3] = {{' ',' ', ' '}, {' ',' ', ' '}, {' ',' ', ' '}}; // character board representing X and O
// here we could've used only the realBoard and not the board, anyways you can optimise it
/*
- | - | -       7 | 8 | 9
.........       .........
- | - | -   =   4 | 5 | 6
.........       .........
- | - | -       1 | 2 | 3
*/

void showRules()
{
    cout << "Board mapping:\n";
    // displaying board
    cout << " 7 " << "|" << " 8 "<< "|" << " 9 "<<"\n";
    cout << "..........." << "\n";
    cout << " 4 " << "|" << " 5 "<< "|" << " 6 "<<"\n";
    cout << "..........." << "\n";
    cout << " 1 " << "|" << " 2 "<< "|" << " 3 "<<"\n";
    // instruction to players
    cout << "Player-X shall begin the game\n";
}

void printBoard()
{
    // updating our realBoard
    for(int i = 0 ; i < 3 ; i++)
        for(int j = 0 ; j < 3 ; j++)
        {
            if(board[i][j] == 1)
                realBoard[i][j] = 'X';
            else if(board[i][j] == 2)
                realBoard[i][j] = 'O';
        }
    // displaying board
    cout << realBoard[0][0] << " | " << realBoard[0][1] << " | " << realBoard[0][2] <<"\n";
    cout << "..........." << "\n";
    cout << realBoard[1][0] << " | " << realBoard[1][1] << " | " << realBoard[1][2] <<"\n";
    cout << "..........." << "\n";
    cout << realBoard[2][0] << " | " << realBoard[2][1] << " | " << realBoard[2][2] <<"\n";
}

int get(int pos) // returns value at board[i][j] where (i,j) represent a number from 1 to 9
{
    switch (pos)
    {
    case 1:
        return board[2][0];
    case 2:
        return board[2][1];
    case 3:
        return board[2][2];
    case 4:
        return board[1][0];
    case 5:
        return board[1][1];
    case 6:
        return board[1][2];
    case 7:
        return board[0][0];
    case 8:
        return board[0][1];
    case 9:
        return board[0][2];

    default:
        return -1;
    }
}
void set(int pos, int value) // returns value at board[i][j] where (i,j) represent a number from 1 to 9
{
    switch (pos)
    {
    case 1:
        board[2][0] = value;
        break;
    case 2:
        board[2][1] = value;
        break;
    case 3:
        board[2][2] = value;
        break;
    case 4:
        board[1][0] = value;
        break;
    case 5:
        board[1][1] = value;
        break;
    case 6:
        board[1][2] = value;
        break;
    case 7:
        board[0][0] = value;
        break;
    case 8:
        board[0][1] = value;
        break;
    case 9:
        board[0][2] = value;
        break;
    }
}

void game()
{
    int turn = 1; // 1 = X, 2 = O
    int count = 0;

    while (true)
    {
        printBoard();
        char player = (turn == 1) ? 'X' : 'O'; // 1 = X, 2 = O
        cout << "It's your turn, " << player << ". Move to which place? ";

        int move;
        cin >> move;

        if (get(move) == 0) // just to have a check that the current position is blank
        {
            set(move, turn);
            count ++;
        }
        else
        {
            cout << "Invalid move !\n";
            continue;
        }

        // Now we will check if player X or O has won,for every move after 5 moves (3 for x/o and 2 for o/x).
        if (count >= 5)
        {
            if (get(7) == get(8) == get(9) != ' ')
            { // checking across the top
                printBoard();
                cout << "\nGame Over.\n";
                cout << " **** " << player << " won ! ****";
                break;
            }
            else if (get(4) == get(5) == get(6) != 0)
            { // across the middle
                printBoard();
                cout << "\nGame Over.\n";
                cout << " **** " << player << " won ! ****";
                break;
            }
            else if (get(1) == get(2) == get(3) != 0)
            { // across the bottom
                printBoard();
                cout << "\nGame Over.\n";
                cout << " **** " << player << " won ! ****";
                break;
            }
            else if (get(1) == get(4) == get(7) != 0)
            { // vertically down the left side
                printBoard();
                cout << "\nGame Over.\n";
                cout << " **** " << player << " won ! ****";
                break;
            }
            else if (get(2) == get(5) == get(8) != 0)
            { // down the middle
                printBoard();
                cout << "\nGame Over.\n";
                cout << " **** " << player << " won ! ****";
                break;
            }
            else if (get(3) == get(6) == get(9) != 0)
            { // down the right side
                printBoard();
                cout << "\nGame Over.\n";
                cout << " **** " << player << " won ! ****";
                break;
            }
            else if (get(7) == get(5) == get(3) != 0)
            { // diagonal
                printBoard();
                cout << "\nGame Over.\n";
                cout << " **** " << player << " won ! ****";
                break;
            }
            else if (get(1) == get(5) == get(9) != 0)
            { // diagonal
                printBoard();
                cout << "\nGame Over.\n";
                cout << " **** " << player << " won ! ****";
                break;
            }
        }

        if (count == 9)
        { // If neither X nor O wins and the board is full, we'll declare the result as 'tie'.
            cout << "\nGame Over.\n";
            cout << "It's a Tie !!!";
            break;
        }

        // Now we have to change the player after every move.
        if (turn == 1) 
        turn = 2;
        else
        turn = 1;
    }
}

int main()
{
    showRules();
    game();
    cout << endl;
    return 0;
}