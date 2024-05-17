import json
import matplotlib.pyplot as plt

# Load performance data from JSON file
with open('src/performance_data.json', 'r') as f:
    data = json.load(f)

# Extract metrics
metrics = ['precision', 'recall', 'f1Score', 'accuracy']
values = [data[metric] for metric in metrics]

# Plot the metrics
plt.figure(figsize=(10, 5))
plt.bar(metrics, values, color=['red', 'blue', 'green', 'purple'])
plt.ylim(0, 1)
plt.xlabel('Metrics')
plt.ylabel('Values')
plt.title('Bot Performance Metrics')
plt.show()
