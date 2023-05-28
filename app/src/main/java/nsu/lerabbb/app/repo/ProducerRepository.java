package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Order;
import nsu.lerabbb.app.entities.Producer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProducerRepository extends JpaRepository<Producer, Long> {
    @Query("SELECT o FROM Producer o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<Producer> findById(@Param("id") Long id);
}
