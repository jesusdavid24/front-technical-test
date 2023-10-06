import { useEffect } from 'react';
import Chart from 'chart.js/auto';

export const Graphics = ({ userData }) => {
  useEffect(() => {
    if (userData.length > 0) {
      createChart(userData);
    }
  }, [userData]);

  const createChart = (userData) => {
    const labels = userData.map((user) => user.login);
    const followers = userData.map((user) => user.followers);

    const ctx = document.getElementById('followersChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Número de Seguidores',
            data: followers,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return <canvas id="followersChart" width="400" height="200"></canvas>;
};


