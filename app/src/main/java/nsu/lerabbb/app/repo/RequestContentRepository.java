package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.OrderContent;
import nsu.lerabbb.app.entities.RequestContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestContentRepository extends JpaRepository<RequestContent, Long> {
    @Query("SELECT r FROM RequestContent r WHERE r.request.id = ?1")
    Optional<List<RequestContent>> findContentByRequest(Long rId);

    @Override
    @Query("SELECT o FROM RequestContent o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<RequestContent> findById(@Param("id") Long id);

    @Query("SELECT o FROM RequestContent o WHERE o.request.id = :requestId ORDER BY o.request.id DESC")
    Optional<List<RequestContent>> findByRequest(@Param("requestId") Long requestId);
}
