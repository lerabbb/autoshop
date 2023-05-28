package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Order;
import nsu.lerabbb.app.entities.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Override
    @Query("SELECT o FROM Sale o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<Sale> findById(@Param("id") Long id);
}
