import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationBar: React.FC<PaginationBarProps> = ({ totalPages, currentPage, onPageChange }) => {
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)} className="me-2">
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="pagination-container">
      <Pagination className="justify-content-center">{items}</Pagination>
    </div>
  );
};

