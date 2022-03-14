import React from 'react';
import { useParams } from 'react-router-dom';

interface BillDetailPageProps {}

const BillDetailPage: React.FC<BillDetailPageProps> = () => {
  const { id } = useParams();
  console.log([id, ' in Bill Detail Page']);
  return <>BillDetailPage</>;
};

export default BillDetailPage;
