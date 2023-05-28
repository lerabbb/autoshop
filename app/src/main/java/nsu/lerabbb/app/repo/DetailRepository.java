package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Consumer;
import nsu.lerabbb.app.entities.Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DetailRepository extends JpaRepository<Detail, Long> {
    @Override
    @Query("SELECT d FROM Detail d WHERE d.id = :id ORDER BY d.id DESC")
    Optional<Detail> findById(@Param("id") Long id);
}
