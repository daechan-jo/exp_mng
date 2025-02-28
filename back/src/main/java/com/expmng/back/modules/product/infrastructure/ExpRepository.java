package com.expmng.back.modules.product.infrastructure;

import com.expmng.back.modules.product.infrastructure.entities.Exp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpRepository extends JpaRepository<Exp, Long> {
}
