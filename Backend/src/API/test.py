import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
def test():
    mu, sigma = 27.66, 10.39  # mean and standard deviation
    y = np.random.normal(mu, sigma, 30)
    print(y)
    x = np.arange(1,31).reshape((-1,1))
    model = LinearRegression().fit(x, y)
    r_sq = model.score(x, y)
    print('coefficient of determination:', r_sq)
    print('intercept:', model.intercept_)
    print('slope:', model.coef_)
    y_pred = model.intercept_ + model.coef_ * 35
    print('predicted response:', y_pred, sep='\n')
    count, bins, ignored = plt.hist(y, 30, density=True)
    plt.plot(bins, 1 / (sigma * np.sqrt(2 * np.pi)) *
             np.exp(- (bins - mu) ** 2 / (2 * sigma ** 2)),
             linewidth=2, color='r')
    plt.show()
    plt.savefig('../../../Frontend/myapp/src/assets/new_plot.png')
    return 1
if __name__ == "__main__":
    test()