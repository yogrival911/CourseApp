
  
  export class CourseDetail {
    constructor({
      id,
      slug,
      title,
      excerpt,
      description,
      thumbnail_url,
      thumbnail_video_url,
      tutors = [],
      popularity,
      difficulty_level,
      categories = [],
      plan,
      lessons_count,
      userback_id,
      hidden,
      modules = [],
      includes_section = {},
    }) {
      this.id = id;
      this.slug = slug;
      this.title = title;
      this.excerpt = excerpt;
      this.description = description;
      this.thumbnailUrl = thumbnail_url;
      this.thumbnailVideoUrl = thumbnail_video_url;
      this.tutors = tutors.map((tutor) => new Tutor(tutor));
      this.popularity = popularity;
      this.difficultyLevel = difficulty_level;
      this.categories = categories.map((c) => new Category(c));
      this.plan = plan;
      this.lessonsCount = lessons_count;
      this.userbackId = userback_id;
      this.hidden = hidden;
      this.modules = modules.map((m) => new Module(m));
      this.includesSection = new IncludesSection(includes_section);
    }
  }
  
  export class Tutor {
    constructor({ id, name, bio, description, avatar_url }) {
      this.id = id;
      this.name = name;
      this.bio = bio;
      this.description = description;
      this.avatarUrl = avatar_url;
    }
  }
  
  export class Category {
    constructor({ id, name }) {
      this.id = id;
      this.name = name;
    }
  }
  
  export class Module {
    constructor({ id, title, position, lessons_count, lessons = [] }) {
      this.id = id;
      this.title = title;
      this.position = position;
      this.lessonsCount = lessons_count;
      this.lessons = lessons.map((l) => new Lesson(l));
    }
  }
  
  export class Lesson {
    constructor({
      id,
      title,
      type,
      position,
      duration,
      open_access,
    }) {
      this.id = id;
      this.title = title;
      this.type = type;
      this.position = position;
      this.duration = duration ?? null;
      this.openAccess = open_access;
    }
  }
  
  export class IncludesSection {
    constructor({
      modules_count,
      lessons_count,
      lab_lessons,
      lab_lesson_count,
      quiz_lessons,
      quiz_lesson_count,
      mock_exams,
      hours_of_video,
      course_duration,
    }) {
      this.modulesCount = modules_count;
      this.lessonsCount = lessons_count;
      this.labLessons = lab_lessons;
      this.labLessonCount = lab_lesson_count;
      this.quizLessons = quiz_lessons;
      this.quizLessonCount = quiz_lesson_count;
      this.mockExams = mock_exams;
      this.hoursOfVideo = hours_of_video;
      this.courseDuration = course_duration;
    }
  }
  