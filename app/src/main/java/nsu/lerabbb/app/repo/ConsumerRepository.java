package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Consumer;
import nsu.lerabbb.app.entities.Defect;
import org.hibernate.boot.archive.internal.JarProtocolArchiveDescriptor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConsumerRepository extends JpaRepository<Consumer, Long> {
    @Override
    @Query("SELECT c FROM Consumer c WHERE c.id = :id ORDER BY c.id DESC")
    Optional<Consumer> findById(@Param("id") Long id);
}
