package com.expmng.back.modules.product.infrastructure.repository;

import com.expmng.back.modules.product.infrastructure.entity.Exp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;


@Repository
public interface ExpRepository extends JpaRepository<Exp, Long> {

	Page<Exp> findByStatusTrueOrderByDeadlineDesc(Pageable pageable);

	Page<Exp> findByStatusFalseOrderByDeadlineAsc(Pageable pageable);

	Long countByDeadlineBetweenAndStatusFalse(LocalDateTime startOfDay, LocalDateTime endOfDay);

	Long countByDeadlineBetweenAndStatusTrue(LocalDateTime startDate, LocalDateTime endDate);
}