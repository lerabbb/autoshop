package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Detail;
import nsu.lerabbb.app.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Override
    @Query("SELECT o FROM Order o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<Order> findById(@Param("id") Long id);
}
