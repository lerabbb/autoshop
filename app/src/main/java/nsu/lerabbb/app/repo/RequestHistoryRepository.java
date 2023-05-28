package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Order;
import nsu.lerabbb.app.entities.RequestHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RequestHistoryRepository extends JpaRepository<RequestHistory, Long> {
    @Override
    @Query("SELECT o FROM RequestHistory o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<RequestHistory> findById(@Param("id") Long id);
}
