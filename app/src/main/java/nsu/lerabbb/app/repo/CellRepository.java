package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Cell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CellRepository extends JpaRepository<Cell, Long> {
    @Override
    @Query("SELECT d FROM Cell d WHERE d.id = :id ORDER BY d.id DESC")
    Optional<Cell> findById(@Param("id") Long id);
}
