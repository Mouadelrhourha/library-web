import './HomePage.css';
import {useEffect, useMemo, useState} from 'react';
import {getCountBorrowsByMonth, getMostBorrowedBooks, getTopBorrowingUsers} from '../../api/borrow.api';
import { Bar,Doughnut,Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement,LineElement,PointElement } from 'chart.js';
import {Col, Divider, Row} from 'antd';
import {PageTitle} from '../../components/PageTitle';

// Register components
ChartJS.register(CategoryScale, LineElement,ArcElement,LinearScale, BarElement, Title, Tooltip, Legend,PointElement);

export const HomePage = () => {
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
  const [topBorrowingUsers, setTopBorrowingUsers] = useState([]);
  const [countBorrowsByMonth, setCountBorrowsByMonth] = useState([]);

  const colorCharts = ['#7d6608 ', '#af601a ', '#e67e22', '#f0b27a ', '#f8c471', '#f6ddcc ', '#fbeee6 ', '#f9e79f', '#f9e79f'];

  useEffect(() => {
    getMostBorrowedBooks().then((data) => setMostBorrowedBooks(data))
      .catch((error) => console.error(error));

    getTopBorrowingUsers().then((data) => setTopBorrowingUsers(data))
      .catch((error) => console.error(error));

    getCountBorrowsByMonth().then((data) => setCountBorrowsByMonth(data))
      .catch((error) => console.error(error));
  }, []);

  const mostBorrowedBooksChartData = useMemo(() => ({
    labels : mostBorrowedBooks.map((book) => book.title),
    datasets: [
      {
        label: '',
        data : mostBorrowedBooks.map((book) => book.borrowcount),
        backgroundColor: colorCharts,
      }
    ]
  }), [mostBorrowedBooks]);

  const mostBorrowedBooksChartOptions = { plugins: {legend : {display: false}}};

  const topBorrowingUsersChartData = useMemo(() => ({
    labels : topBorrowingUsers.map((book) => book.email),
    datasets: [
      {
        data : topBorrowingUsers.map((book) => book.borrowcount),
        backgroundColor: colorCharts,
      }
    ]
  }), [mostBorrowedBooks]);

  const countBorrowsByMonthChartData = useMemo(() => ({
    labels : countBorrowsByMonth.map((book) => book.month),
    datasets: [
      {
        label: 'Nombre d\'emprunts mensuelles',
        data : countBorrowsByMonth.map((book) => book.count),
        backgroundColor: colorCharts,
        borderColor: '#E67E22FF',
      }
    ]
  }), [countBorrowsByMonth]);

  return (
    <>
      <PageTitle level={1} title={'Tableau de bord'} />
      <Divider />
      <div>
        <Row justify={'center'} >
          <Col span={8} xs={{span: 24}} md={{span: 10}} sm={{span: 22}}>
            <h3>Livres les plus empruntés</h3>
            <Bar width={'100%'} height={'100%'} data={mostBorrowedBooksChartData} options={mostBorrowedBooksChartOptions} />
          </Col>
          <Col span={9} xs={{span: 24}} md={{span: 10}} sm={{span: 22}} lg={{span: 8}}>
            <h3>Utilisateurs les plus emprunteurs</h3>
            <Doughnut width={'100%'} height={'90%'} data={topBorrowingUsersChartData} />
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col span={16} xs={{span:24}} md={{span:16}} sm={{span: 24}} lg={{span: 10}}>
            <h3>Nombre d'emprunts par mois</h3>
            <Line width={'100%'} height={'100%'} data={countBorrowsByMonthChartData} />
          </Col>
        </Row>
      </div>
    </>
  );
};
