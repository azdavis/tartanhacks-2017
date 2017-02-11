## Stairwell: How it works


## What is a question made of?

Each question should 
- Factors that contribute to the result
- Answer

## What is our neural net made of?

- Input
    - The input is the data you enter into the system. It consists of whether or not a factor is present in each trial.
- Weights
    - The weights change the impact each factor has on the final result
- Result
    - When the weights are applied to the input, it calculates the result. This is the answer to the question!

## How does training begin?

The initial data from the user is what is used to train the neural net.
This data is split into the input, which are the factors, and the results, which
are the answers.

The weights are initialized by generating a set of random values.

## How does the neural net learn the data?

The loop first executes forward propagation, using the weights to calculate the
estimated results.

It then uses backwards propagation. This involves updating the weights based on
how far the results were from the real answers, factoring in the confidence of
the returned result.

Once the weights have been tuned to the data set, the neural net has
successfully learned to interpret inputs for the particular question.

## How is the neural net used?

The user inputs another row of data, which is then sent to the neural net. The
neural net uses the set of weights that it has learned to calculate what it
thinks the result of the new input should be.
