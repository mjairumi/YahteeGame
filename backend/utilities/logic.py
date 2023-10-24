import random


def randomNums(n=5):
    randvalues = [random.randint(1,6) for i in range(n)]
    return randvalues