import numpy as np
import pandas as pd

n_trans = 50
n_features = 8

O = np.random.randint(2, size=(n_trans, n_features))
data = pd.DataFrame(O, columns = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'])
data.to_csv('data.csv')
print("File generated")