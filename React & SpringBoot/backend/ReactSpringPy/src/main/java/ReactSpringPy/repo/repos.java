package ReactSpringPy.repo;
import org.springframework.data.mongodb.repository.MongoRepository;
import ReactSpringPy.entity.student;
public interface repos extends MongoRepository<student,String>{
	student findByRegNo(String regNo);
	void deleteById(String regNo);
}