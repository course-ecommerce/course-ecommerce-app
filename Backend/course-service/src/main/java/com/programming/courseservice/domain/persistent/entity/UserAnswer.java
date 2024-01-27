package com.programming.courseservice.domain.persistent.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAnswer {
    @Id
    private String id;

    @Column(name = "current_answer")
    private String currentAnswer;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @OneToOne(targetEntity = Question.class)
    @JoinColumn(name = "question_id", foreignKey = @ForeignKey(name = "fk_user_answer_question_id"))
    private Question question;

    @PrePersist
    private void ensureId() {
        this.id = UUID.randomUUID().toString();
    }
}
