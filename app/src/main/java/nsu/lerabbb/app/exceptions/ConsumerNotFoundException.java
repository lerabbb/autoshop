package nsu.lerabbb.app.exceptions;

public class ConsumerNotFoundException extends RuntimeException{
    public ConsumerNotFoundException(Long id){
        super("Could not found consumer with id "+ id);
    }
}
