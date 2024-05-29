import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

interface Topic {
  name: string;
  value: number;
}

@Component({
  selector: 'app-looker-testform',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './looker-testform.component.html',
  styleUrls: ['./looker-testform.component.scss'],
})
export class LookerTestformComponent implements OnInit {
  topics: Topic[] = [
    { name: 'Conventioneel', value: 0 },
    { name: 'Praktisch', value: 0 },
    { name: 'Analytisch', value: 0 },
    { name: 'Kunstzinnig', value: 0 },
    { name: 'Sociaal', value: 0 },
    { name: 'Ondernemend', value: 0 },
  ];

  radarChartData: any[] = [];
  radarChartLabels = this.topics.map((topic) => topic.name);
  radarChartOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          backdropColor: 'rgba(0, 0, 0, 0)',
          showLabelBackdrop: false, // Hide the label backdrop for the ticks
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Show the legend to distinguish datasets
      },
    },
  };

  richtingValues: number[] = [];
  similarityPercentage: number = 0;

  ngOnInit() {
    this.richtingValues = this.generateRandomValues();
    this.updateChart();
    this.calculateSimilarity();
  }

  generateRandomValues() {
    return this.topics.map(() => Math.floor(Math.random() * 101));
  }

  updateChart() {
    this.radarChartData = [
      {
        data: this.topics.map((topic) => topic.value),
        label: 'Mijn Skills',
      },
      {
        data: this.richtingValues,
        label: 'Toegepaste Informatica',
      },
    ];
    this.calculateSimilarity();
  }

  calculateSimilarity() {
    const userValues: number[] = this.topics.map((topic) => topic.value);
    const randomValues = this.richtingValues;

    const totalDifference = userValues.reduce((sum, value, index) => {
      return sum + Math.abs(value - randomValues[index]);
    }, 0);

    const maxDifference = 100 * userValues.length;
    this.similarityPercentage =
      ((maxDifference - totalDifference) / maxDifference) * 100;
  }
}