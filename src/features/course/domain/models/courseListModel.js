// src/features/course/domain/CourseListResponseModel.js

export class CourseListResponseModel {
  constructor({ courses = [], metadata }) {
    this.courses = courses.map((course) => new Course(course));
    this.metadata = new Metadata(metadata);
  }
}

export class Course {
  constructor({
    id,
    slug,
    title,
    thumbnail_url,
    thumbnail_video_url,
    tutors = [],
    popularity,
    difficulty_level,
    categories = [],
    plan,
  }) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.thumbnailUrl = thumbnail_url;
    this.thumbnailVideoUrl = thumbnail_video_url;
    this.tutors = tutors.map((tutor) => new Tutor(tutor));
    this.popularity = popularity;
    this.difficultyLevel = difficulty_level;
    this.categories = categories.map((c) => new Category(c));
    this.plan = plan;
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

export class Metadata {
  constructor({ limit, page, total_count, next_page }) {
    this.limit = limit;
    this.page = page;
    this.totalCount = total_count;
    this.nextPage = next_page;
  }

  get hasMore() {
    return this.page * this.limit < this.totalCount;
  }
}
