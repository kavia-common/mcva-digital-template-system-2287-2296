import React from 'react';

/**
 * PUBLIC_INTERFACE
 * UiBlockCard renders a block card with thumbnail placeholder, title,
 * description, tags and a non-functional "View" button.
 * Props:
 * - block: { id, title, description, tags, thumbnail }
 */
export default function UiBlockCard({ block }) {
  return (
    <article className="ui-card card-hover" aria-label={`${block.title} block`}>
      <div className="ui-card-thumb" role="img" aria-label={`${block.title} preview`}>
        {/* Themed gradient placeholder; could be replaced with real thumbnail */}
        <div className="ui-card-thumb-surface" />
      </div>
      <div className="ui-card-body">
        <h3 className="ui-card-title">{block.title}</h3>
        <p className="ui-card-desc">{block.description}</p>
        <div className="ui-card-tags" aria-label="Tags">
          {block.tags?.map((t) => (
            <span key={t} className="tag tag-badge">#{t}</span>
          ))}
        </div>
      </div>
      <div className="ui-card-actions">
        <button className="button" type="button" aria-label={`View ${block.title}`}>
          View
        </button>
      </div>
    </article>
  );
}
